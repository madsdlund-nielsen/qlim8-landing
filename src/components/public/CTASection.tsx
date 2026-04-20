interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  variant?: "dark" | "light";
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = "dark",
}: CTASectionProps) {
  const isDark = variant === "dark";

  const renderButton = (btn: CTAButton, isPrimary: boolean) => {
    const className = isPrimary
      ? "px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
      : isDark
        ? "px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
        : "px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors";

    const testId = isPrimary ? "button-cta-primary" : "button-cta-secondary";

    if (btn.href) {
      return (
        <a href={btn.href} className={className} data-testid={testId}>
          {btn.text}
        </a>
      );
    }
    return (
      <button onClick={btn.onClick} className={className} data-testid={testId}>
        {btn.text}
      </button>
    );
  };

  if (isDark) {
    return (
      <section className="py-20 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="text-cta-title">
            {title}
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {renderButton(primaryButton, true)}
            {secondaryButton && renderButton(secondaryButton, false)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative z-20 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" data-testid="text-cta-title">
            {title}
          </h2>
          <p className="text-gray-600 mb-8">
            {description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {renderButton(primaryButton, true)}
            {secondaryButton && renderButton(secondaryButton, false)}
          </div>
        </div>
      </div>
    </div>
  );
}
