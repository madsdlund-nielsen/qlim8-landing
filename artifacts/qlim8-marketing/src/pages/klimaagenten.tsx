import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Plus, 
  Trash2, 
  Loader2, 
  Sparkles, 
  TrendingDown, 
  BarChart3, 
  Target,
  ChevronLeft,
  ChevronRight,
  Bot,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { trackFeatureUse } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  tenantId: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolCalls?: unknown;
  toolResults?: unknown;
  createdAt: string;
}

interface ChatResponse {
  sessionId: string;
  message: string;
  toolCalls?: unknown[];
}

const SUGGESTION_CHIPS = [
  { 
    icon: BarChart3, 
    key: "emissions_overview",
    textKey: "klimaagent.suggestion.emissionsOverview",
  },
  { 
    icon: TrendingDown, 
    key: "scope_breakdown",
    textKey: "klimaagent.suggestion.scopeBreakdown",
  },
  { 
    icon: Target, 
    key: "create_target",
    textKey: "klimaagent.suggestion.createTarget",
  },
  { 
    icon: Sparkles, 
    key: "reduction_ideas",
    textKey: "klimaagent.suggestion.reductionIdeas",
  },
];

export default function Klimaagenten() {
  const { t } = useI18n();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: sessions = [], isLoading: sessionsLoading } = useQuery<ChatSession[]>({
    queryKey: ["/api/klimaagent/sessions"],
    queryFn: async () => {
      const res = await fetch("/api/klimaagent/sessions", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: [`/api/klimaagent/sessions/${activeSessionId}/messages`],
    queryFn: async () => {
      if (!activeSessionId) return [];
      const res = await fetch(`/api/klimaagent/sessions/${activeSessionId}/messages`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    enabled: !!activeSessionId,
  });

  const sendMessageMutation = useMutation<ChatResponse, Error, string>({
    mutationFn: async (message: string) => {
      const res = await fetch("/api/klimaagent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          message, 
          sessionId: activeSessionId || undefined 
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      return res.json();
    },
    onSuccess: (data) => {
      setActiveSessionId(data.sessionId);
      queryClient.invalidateQueries({ queryKey: ["/api/klimaagent/sessions"] });
      queryClient.invalidateQueries({ queryKey: [`/api/klimaagent/sessions/${data.sessionId}/messages`] });
      setIsTyping(false);
      trackFeatureUse("klimaagent_message_sent");
    },
    onError: (error) => {
      toast({
        title: t("klimaagent.error"),
        description: error.message,
        variant: "destructive",
      });
      setIsTyping(false);
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await fetch(`/api/klimaagent/sessions/${sessionId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete session");
      return res.json();
    },
    onSuccess: () => {
      if (activeSessionId) {
        setActiveSessionId(null);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/klimaagent/sessions"] });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || sendMessageMutation.isPending) return;
    setInputMessage("");
    setIsTyping(true);
    sendMessageMutation.mutate(message);
  };

  const handleNewChat = () => {
    setActiveSessionId(null);
    setInputMessage("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("da-DK", {
      day: "numeric",
      month: "short",
    });
  };

  const isNewSession = !activeSessionId && messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background" data-testid="klimaagent-page">
      {sidebarOpen && (
        <aside className="w-64 border-r bg-muted/30 flex flex-col" data-testid="chat-sidebar">
          <div className="p-4">
            <Button 
              onClick={handleNewChat} 
              className="w-full gap-2"
              variant="outline"
              data-testid="button-new-chat"
            >
              <Plus className="h-4 w-4" />
              {t("klimaagent.newChat")}
            </Button>
          </div>
          
          <Separator />
          
          <ScrollArea className="flex-1 px-2">
            <div className="py-2 space-y-1">
              {sessionsLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {t("klimaagent.noChats")}
                </p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                      activeSessionId === session.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                    onClick={() => setActiveSessionId(session.id)}
                    data-testid={`session-item-${session.id}`}
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span className="truncate flex-1">{session.title}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatTime(session.createdAt)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSessionMutation.mutate(session.id);
                      }}
                      data-testid={`button-delete-session-${session.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </aside>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 p-2 border-b bg-muted/20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-testid="button-toggle-sidebar"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold">{t("klimaagent.title")}</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          {isNewSession ? (
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 mx-auto">
                  <Bot className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">{t("klimaagent.welcome")}</h2>
                <p className="text-muted-foreground">{t("klimaagent.welcomeDescription")}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {SUGGESTION_CHIPS.map((chip) => (
                  <Card
                    key={chip.key}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSuggestionClick(t(chip.textKey))}
                    data-testid={`suggestion-${chip.key}`}
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      <chip.icon className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="text-sm text-left" data-testid={`suggestion-text-${chip.key}`}>{t(chip.textKey)}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {messagesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                    data-testid={`message-${message.id}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-emerald-600" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 max-w-[80%]",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t bg-background">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="max-w-3xl mx-auto flex gap-2"
          >
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t("klimaagent.placeholder")}
              disabled={sendMessageMutation.isPending}
              className="flex-1"
              data-testid="input-chat-message"
            />
            <Button 
              type="submit" 
              disabled={!inputMessage.trim() || sendMessageMutation.isPending}
              data-testid="button-send-message"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {t("klimaagent.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
