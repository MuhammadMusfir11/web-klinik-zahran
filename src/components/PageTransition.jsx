import { useLocation } from 'react-router-dom'
import { clinic } from '../data/clinic'

export default function PageTransition() {
  const { pathname } = useLocation()

  return (
    <div
      key={pathname}
      aria-hidden="true"
      className="curtain pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-forest"
    >
      <span className="curtain-label font-serif text-3xl text-ivory sm:text-4xl">
        {clinic.name}
      </span>
    </div>
  )
}