import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicFooter from '../../components/public-footer';
import PublicHeader from '../../components/public-header';

const Terms = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [])

  return (
    <div className="h-full w-full font-sans text-xs md:text-sm bg-creme text-burnt-sienna-darker">
      <PublicHeader />
      <main id="terms" className="max-w-screen-lg mx-auto px-2 text-base">
        <div className="my-10">
          <h1 className="text-center text-4xl">Terms of Service</h1>
        </div>
        <article>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the services, including our various websites, APIs, 
            email notifications, and applications (the "Services" or "Coffeastock"), and any information, text, graphics, photos or 
            other materials uploaded, downloaded or appearing on the Services (collectively referred to as "Content"). Coffeastock is 
            owned by Maiko Miyazaki, Dublin - Ireland. (referred to as "I", "Me", "Our" or "We"). As a customer of this service you're 
            a "User" or "You" according to this agreement. Your access to and use of the Services are conditioned on your acceptance 
            of and compliance with these Terms. By accessing or using the Services you agree to be bound by these Terms.
          </p>
          <p>
            We reserve the right to update and change these Terms of Service without notice. Any new features that augment or enhance 
            the current Service, including the release of new tools and resources, shall be subject to the Terms of Service. Continued 
            use of the Service after any such changes shall constitute your consent to such changes. You can review the most current 
            version of the Terms of Service at any time at: https://docs.Coffeastock.app/terms
          </p>
          <p>
            Violation of any of the terms below will result in the termination of your Account. While Coffeastock prohibits such conduct 
            and Content on the Service, you understand and agree that Coffeastock cannot be responsible for the Content posted on the 
            Service and you nonetheless may be exposed to such materials. You agree to use the Service at your own risk.
          </p>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Account Registration and Passwords</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                You may be required to create an account with Coffeastock in order to access certain Services. It is a condition of your use 
                of the Services that all the information you provide on the Services is correct, current and complete. We reserve the right 
                to disable any user account, at any time in our sole discretion for any or no reason, including if, in our opinion, you have 
                failed to comply with any provision of these Terms.
              </li>
              <li>
                You are responsible for safeguarding the password that you use in association with your account and for any activities or 
                actions performed under your account. We recommend that you use "strong" passwords (passwords that use a combination of 
                upper and lower case letters, numbers and symbols) with your account and that you logout from your account at the end of 
                every session. Coffeastock cannot and will not be liable for any loss or damage arising from your failure to comply with the 
                above. You agree to notify Coffeastock immediately at contact@Coffeastock.app of any actual or suspected unauthorized use of your 
                account or any other breach of security known by you.
              </li>
              <li>
                You are responsible for remembering the password that you use in association with your account. You understand that Coffeastock 
                encrypts your note data at rest based on the password and it is not able to restore the data without the password.
              </li>
              <li>
                Your login may only be used by one person - a single login shared by multiple people is not permitted. You may create separate 
                logins for as many people as you'd like.
              </li>
              <li>
                You may not use the Service for any illegal purpose or to violate any laws in your jurisdiction (including but not limited 
                to copyright laws).
              </li>
            </ol>
          </section>
        </article>
        
        <article>
          <section>
            <h2 className="text-2xl mb-5">Privacy</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                Any information that you provide to Coffeastock is subject to our Privacy Policy, which governs our collection and 
                use of your information. You understand that through your use of the Services you consent to the collection and 
                use (as set forth in the Privacy Policy) of this information, including the transfer of this information to Ireland 
                and/or other countries for storage, processing and use by Coffeastock.
              </li>
              <li>
                As part of providing you the Services, we may need to provide you with certain communications, such as service 
                announcements and administrative messages. These communications are considered part of the Services and your 
                Coffeastock account, which you may not be able to opt-out from receiving.
              </li>
            </ol>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Payment and Refunds Terms</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                The Service is offered with a 30-day free trial. You will only be able to continue using the Service by paying 
                in advance for additional usage. If you fail to pay for additional usage, your account will be frozen and inaccessible 
                until payment is made.
              </li>
              <li>
                There will be no refunds or credits for partial months of service.
              </li>
              <li>
                All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities. If your billing address is in 
                Ireland, you shall be responsible for payment of a consumption tax.
              </li>
              <li>
                The credit card that you provided will automatically be charged the new rate on your next billing cycle when your 
                billing status changes.
              </li>
              <li>
                If you switch a plan to another one with different billing cycle (e.g., from a monthly plan to a yearly plan), 
                the billing date becomes the date of the switch. By default, Coffeastock prorates subscription costs in this case.
              </li>
            </ol>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Cancellation and Termination</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                You are solely responsible for properly canceling your account. An email or phone request to cancel your account is 
                not considered cancellation. You can cancel your account at any time by visiting your account page on my.Coffeastock.app.
              </li>
              <li>
                All of your content will be immediately be inaccessible from the Service upon cancellation. This information can not 
                be recovered once it has been permanently deleted.
              </li>
              <li>
                We, in its sole discretion, have the right to suspend or terminate your account and refuse any and all current or 
                future use of the Service for any reason at any time. Such termination of the Service will result in the deactivation 
                or deletion of your Account or your access to your Account, and the forfeiture and relinquishment of all content in 
                your account. We reserve the right to refuse service to anyone for any reason at any time.
              </li>
              <li>
                We will terminate your account after 6 months since it has been deactivated due to no successful payments to the Service.
              </li>
            </ol>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Modifications to the Service and Prices</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, any 
                part of the Service with or without notice.
              </li>
              <li>
                Prices of all Services are subject to change upon 30 days notice from us. Such notice may be provided at any time 
                by posting the changes to the Coffeastock site or the Service itself.
              </li>
              <li>
                We shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance 
                of the Service.
              </li>
            </ol>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Copyright and Content Ownership</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                All content posted on the Service is must comply with Irish copyright law.
              </li>
              <li>
                We claim no intellectual property rights over the material you provide to the Service. All materials uploaded 
                remain yours.
              </li>
              <li>
                We do not pre-screen content, but reserves the right (but not the obligation) in their sole discretion to refuse 
                or remove any content that is available via the Service.
              </li>
              <li>
                The look and feel of the Service is copyright© Maiko Miyazaki. All rights reserved. You may not duplicate, 
                copy, or reuse any portion of the HTML, CSS, JavaScript, or visual design elements without express written permission 
                from the Company.
              </li>
            </ol>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">General Conditions</h2>
          </section>
          <section>
            <ol className="list-decimal">
              <li>
                Your use of the Service is at your sole risk. The service is provided on an “as is” and “as available” basis.
              </li>
              <li>
                Technical support is only provided via email.
              </li>
              <li>
                You understand that we use third party vendors and hosting partners to provide the necessary hardware, software, 
                networking, storage, and related technology required to run the Service.
              </li>
              <li>
                You must not crack the Service.
              </li>
              <li>
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the 
                Service, or access to the Service without the express written permission by us.
              </li>
              <li>
               We may, but have no obligation to, remove content and accounts that we determine in our sole discretion are 
               unlawful or violates any party’s intellectual property or these Terms of Service.
              </li>
              <li>
               Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Service customer 
               will result in immediate account termination.
              </li>
              <li>
                We reserve the right to temporarily disable your account if your usage significantly exceeds the average usage 
                of other Service customers. Of course, we'll reach out to the account owner before taking any action except in 
                rare cases where the level of use may negatively impact the performance of the Service for other customers.
              </li>
              <li>
                We do not warrant that (i) the service will meet your specific requirements, (ii) the service will be uninterrupted, 
                timely, secure, or error-free, (iii) the results that may be obtained from the use of the service will be accurate 
                or reliable, (iv) the quality of any products, services, information, or other material purchased or obtained by you 
                through the service will meet your expectations, and (v) any errors in the Service will be corrected.
              </li>
              <li>
                You expressly understand and agree that we shall not be liable for any direct, indirect, incidental, special, 
                consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data 
                or other intangible losses (even if we have been advised of the possibility of such damages), resulting from: (i) 
                the use or the inability to use the service; (ii) the cost of procurement of substitute goods and services resulting 
                from any goods, data, information or services purchased or obtained or messages received or transactions entered 
                into through or from the service; (iii) unauthorized access to or alteration of your transmissions or data; (iv) 
                statements or conduct of any third party on the service; (v) or any other matter relating to the service.
              </li>
              <li>
               The failure of us to exercise or enforce any right or provision of the Terms of Service shall not constitute a waiver 
               of such right or provision. The Terms of Service constitutes the entire agreement between you and us and govern your 
               use of the Service, superceding any prior agreements between you and us (including, but not limited to, any prior 
               versions of the Terms of Service).
              </li>
              <li>
               Questions about the Terms of Service should be sent to contact@Coffeastock.app.
              </li>
            </ol>
            <p>The end.</p>
          </section>
        </article>
      </main>
      <PublicFooter />
    </div>
  )
}

export default Terms