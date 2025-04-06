import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Center | Metro Bank",
  description: "Learn about Metro Bank's security measures and stay safe while banking online",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Stay Safe Online</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Online Security Tips</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Always use strong, unique passwords for your accounts</li>
              <li>Enable two-factor authentication for added security</li>
              <li>Be cautious of phishing attempts and suspicious emails</li>
              <li>Keep your software and antivirus up to date</li>
              <li>Monitor your accounts regularly for any unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Protecting Your Personal Information</h2>
            <p className="text-gray-700">
              At Metro Bank, we take your privacy seriously. Here are some tips to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mt-4">
              <li>Never share your login credentials with anyone</li>
              <li>Be careful about sharing sensitive information online</li>
              <li>Regularly review your account statements</li>
              <li>Report any suspicious activity immediately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What to Do if You Suspect Fraud</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Contact Metro Bank immediately if you notice anything unusual</li>
              <li>Report any suspicious transactions or communications</li>
              <li>Change your passwords and security settings</li>
              <li>Monitor your accounts closely after reporting</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
