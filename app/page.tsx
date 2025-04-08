import LoginForm from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className=" bg-blue-700 mx-auto w-full px-5 md:px-10 lg:px-16 pb-10">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/metrobank-logo.png"
              alt="Metro Bank"
              width={120}
              height={35}
              className="h-8 w-auto"
            />
          </div>
          {/* <ul className="flex items-center text-white space-x-6">
            <li><Link href="/" className="hover:text-blue-300 ">Home</Link></li>
            <li><Link href="/security" className="hover:text-blue-300 ">Stay Safe Online</Link></li>
            <li><Link href="/metrics" className="hover:text-blue-300 ">Service Quality metrics</Link></li>
          </ul> */}
          <div></div>
          <div></div>
        </div>

        <div className="flex min-h-full items-center justify-center py-20">
          <div className="w-full max-w-md bg-white p-5 rounded-lg">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image src="/metrobank-logo.png" alt="Sovereign Trust Bank Logo" className="h-8 w-auto" width={50} height={50} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Welcome to Metro Bank Online Banking</h2>
              <hr className="my-2 border-gray-300" />
              <div className="pt-6">
                <Link href="/login" className="text-blue-600">Register for online banking</Link>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="bg-white  p-5 md:p-10 lg:p-16">
        <p className="text-gray-500 text-xs ">Your eligible deposits with Metro Bank PLC are protected up to a total of £85,000 by the Financial Services Compensation Scheme, the UK's deposit guarantee scheme. Any deposits you hold above the limit are unlikely to be covered. For further information visit www.fscs.org.uk.</p>
        <p className="text-gray-500 text-xs ">Metro Bank PLC. Registered in England and Wales. Company number: 6419578. Registered office: One Southampton Row, London, WC1B 5HA. We are authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and Prudential Regulation Authority. Metro Bank PLC is an independent UK Bank - it is not affiliated with any other bank or organisation (including the METRO newspaper or its publishers) anywhere in the world. "Metrobank" is the registered trademark of Metro Bank PLC.</p>

        <div className="flex items-center gap-5 pt-10">
          <Link href="/" className="text-gray-500 text-xs ">Copyright 2020 Metro Bank. All rights reserved.</Link>
          <Link href="/" className="text-gray-500 text-xs ">Accessibility</Link>
          <Link href="/" className="text-gray-500 text-xs ">Legal InformationPrivacy</Link>
          <Link href="/" className="text-gray-500 text-xs ">Legal InformationPrivacy and Security</Link>
          <Link href="/" className="text-gray-500 text-xs ">SiteMap</Link>
        </div>

      </div>

    </div>
  )
}

