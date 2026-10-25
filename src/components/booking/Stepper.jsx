export default function Stepper({ steps, current, onJump }) {
  return (
    <nav aria-label="Langkah booking">
      <p className="text-sm text-muted">
        Langkah {current + 1} dari {steps.length}{' '}
        <span aria-hidden="true">·</span>{' '}
        <span className="font-medium text-charcoal">{steps[current]}</span>
      </p>

      <ol className="mt-3 flex gap-1.5">
        {steps.map((label, i) => {
          const done = i < current
          const isCurrent = i === current

          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                disabled={!done}
                onClick={() => onJump(i)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={done ? `Kembali ke langkah ${label}` : `Langkah ${label}`}
                className={`block w-full py-1 text-left ${done ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-colors duration-300 ${
                    done ? 'bg-forest' : isCurrent ? 'bg-ember' : 'bg-line'
                  }`}
                />
                <span
                  className={`mt-2 hidden text-xs sm:block ${
                    isCurrent ? 'font-medium text-charcoal' : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}