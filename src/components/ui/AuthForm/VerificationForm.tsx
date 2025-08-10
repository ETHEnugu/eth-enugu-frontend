"use client"
import { Button } from "@/components/common/button"
import Spinner from "@/components/common/spinner"
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import type React from "react"
import { type SetStateAction, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface VerificationFormProps {
  otp: string[]
  setOtp: React.Dispatch<SetStateAction<string[]>>
  handleLogin: (email: string, verificationCode: string) => Promise<void>
  emailInput: string
  showVerification: boolean
  setShowVerification: (showVerification: boolean) => void
  preLogin: (email: string) => void
}

const baseStyles =
  "bg-[var(--background)] shadow-[0px_20px_24px_-4px_#0A0D1214] shadow-[0px_8px_8px_-4px_#0A0D1208] rounded-[16px] w-full max-w-[680px] h-fit flex-col items-center py-9 px-5 gap-6 transition-transform duration-200 ease-in-out "

export default function VerificationForm({
  otp,
  setOtp,
  handleLogin,
  emailInput,
  showVerification,
  setShowVerification,
  preLogin,
}: VerificationFormProps) {
  const [verifying, setVerifying] = useState<boolean>(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timerValue, setTimerValue] = useState("00:00")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const targetTimeRef = useRef<number>(0)
  const [showTimer, setShowTimer] = useState(true)

  const initializeTimer = () => {
    const startTime = new Date().getTime()
    targetTimeRef.current = startTime + 60 * 1000

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }


    const initialDistance = targetTimeRef.current - new Date().getTime()
    if (initialDistance > 0) {
      const minutes = Math.floor((initialDistance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((initialDistance % (1000 * 60)) / 1000)
      setTimerValue(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
    } else {
      setTimerValue("00:00")
    }

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetTimeRef.current - now

      if (distance <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setTimerValue("00:00")
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimerValue(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
      }
    }, 1000)
  }

  const requestCode = async (email: string) => {
    if (timerValue === "00:00") {

      await preLogin(email)
      initializeTimer()
      toast.success("New verification code sent!")
    } else {
      toast.info(`Please wait for the timer to expire before resending. Remaining: ${timerValue}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value
    if (isNaN(Number(value))) return
    const newOtp = [...otp]
    newOtp[i] = value
    setOtp(newOtp)

    if (value && inputRefs.current[i + 1]) {
      inputRefs.current[i + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus()
    }
  }

  useEffect(() => {

    inputRefs.current[0]?.focus()


    if (showVerification) {
      initializeTimer()
    }


    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [showVerification])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVerifying(true)
    setShowTimer(false)
    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter the full verification code.")
      setVerifying(false)
      return
    }
    await handleLogin(emailInput, otp.join(""))
    setVerifying(false)
  }

  return (
    <form onSubmit={handleSubmit} className={`${baseStyles} ${showVerification ? "flex" : "hidden"} `}>
      <div className=" w-[121px] h-[121px] rounded-full bg-[#F9F5FF] flex items-center justify-center backdrop-blur-sm  outer-ring">
        <div className=" w-[93px] h-[93px] rounded-full bg-[#F4EBFF] flex items-center justify-center inner-ring ">
          <Image
            src={"/placeholder.svg?height=100&width=100&query=mail icon"}
            alt="Mail"
            height={100}
            width={100}
            className="w-12 h-12 "
          />
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-2 text-center justify-center items-center w-full ">
        <h3 className=" font-semibold text-[#181D27] leading-[100%] ">Please check your email.</h3>
        <p className=" font-normal text-[#535862] !text-sm ">
          We&apos;ve sent a code to <span className="font-semibold text-base ">{emailInput} </span>{" "}
        </p>
      </div>
      <div className=" w-full flex flex-col items-center justify-center gap-3 ">
        <div className="w-fit flex flex-row items-center gap-1.5 ">
          {otp.map((data, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              value={data}
              maxLength={1}
              onChange={(e) => handleChange(e, i)}
              type="text"
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="focus:ring-2 focus:ring-[var(--color-orange-500)] border-[1px] border-[#F3A03580] w-[40px] h-[37px] md:w-20 md:h-20 p-2 rounded-lg flex items-center justify-center text-center font-medium text-[var(--color-green-550)] outline-0  text-xl md:text-5xl "
            />
          ))}
        </div>
        <p className=" !text-sm font-normal text-[#535862] ">
          Didn’t get a code?{" "}
          <button
            onClick={() => requestCode(emailInput)}
            type="button"
            className="underline cursor-pointer "
            disabled={timerValue !== "00:00"}
          >
            Click to resend.
          </button>
        </p>
        {timerValue !== "00:00" && showTimer && (
          <p className="text-sm font-medium text-[#535862]">Resend available in: {timerValue}</p>
        )}
      </div>
      <div className="flex items-center gap-3 mx-auto ">
        <Button
          disabled={verifying}
          type="button"
          onClick={() => setShowVerification(false)}
          className=" flex items-center gap-3 rounded-[98.11px] py-3 px-[18px] bg-[var(--background)] text-sm font-semibold text-[var(--color-dark)] hover:bg-[var(--background)] "
        >
          <Icon icon="solar:arrow-left-linear" width={18} height={18} />
          Cancel
        </Button>
        <Button
          type="submit"
          className=" flex items-center gap-3 rounded-[98.11px] py-3 px-[18px] bg-[var(--color-orange-500)] text-sm font-semibold text-[var(--color-dark)] hover:bg-[var(--color-orange-500)] "
        >
          {verifying ? (
            <Spinner />
          ) : (
            <>
              {" "}
              Verify
              <Icon icon="solar:arrow-right-linear" width={18} height={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
