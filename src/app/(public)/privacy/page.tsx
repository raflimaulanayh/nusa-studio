import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

export default function PrivacyPolicyPage() {
  return (
    <GeneralLayout>
      <Container className="py-28">
        <h1 className="mb-8 text-4xl font-semibold text-primary">Privacy Policy</h1>

        <article className="prose prose-slate max-w-none text-gray-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <p>
            Welcome to Nusa Studio. We respect your privacy and are committed to protecting your personal data. This privacy
            policy will inform you as to how we look after your personal data when you visit our website and tell you about
            your privacy rights and how the law protects you.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together
            follows:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-5">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes email address and telephone numbers.</li>
            <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li>Usage Data includes information about how you use our website and services.</li>
          </ul>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">2. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in
            the following circumstances:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-5">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>
              Where it is necessary for our legitimate interests (or those of a third party) and your interests and
              fundamental rights do not override those interests.
            </li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">3. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
            used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data
            to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">4. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br />
            Email: hello@nusacaraka.com
            <br />
            Phone: +62 812 345 678
          </p>
        </article>
      </Container>
    </GeneralLayout>
  )
}
