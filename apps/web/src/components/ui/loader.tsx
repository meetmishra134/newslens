import { motion } from 'motion/react'

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary h-16 w-16"
      >
        <motion.path
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"
        />
      </svg>
    </div>
  )
}

export default Loader
