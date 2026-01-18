import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

export default function TermsPage() {
  return (
    <GeneralLayout>
      <Container className="py-28">
        <h1 className="mb-8 text-4xl font-semibold text-primary">Terms of Service</h1>

        <article className="prose prose-slate max-w-none text-gray-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <p>Please read these terms and conditions carefully before using Our Service.</p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">1. Interpretation and Definitions</h2>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The
            following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">2. Acknowledgment</h2>
          <p>
            These are the Terms and Conditions governing the use of this Service and the agreement that operates between You
            and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of
            the Service.
          </p>
          <p className="mt-2">
            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and
            Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">3. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property of
            the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the
            Country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or
            service without the prior written consent of the Company.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">4. Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by the
            Company. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or
            practices of any third party web sites or services.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">5. Termination</h2>
          <p>
            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right
            to use the Service will cease immediately.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">6. Changes to These Terms and Conditions</h2>
          <p>
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is
            material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking
            effect. What constitutes a material change will be determined at Our sole discretion.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, You can contact us:
            <br />
            Email: hello@nusacaraka.com
          </p>
        </article>
      </Container>
    </GeneralLayout>
  )
}
