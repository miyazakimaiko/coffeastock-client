import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicFooter from '../../components/public-footer';
import PublicHeader from '../../components/public-header';

const Privacy = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [])

  return (
    <div className="h-full w-full font-sans text-xs md:text-sm bg-creme text-burnt-sienna-darker">
      <PublicHeader />
      <main id="privacy" className="max-w-screen-lg mx-auto px-2 text-base">
        <div className="my-10">
          <h1 className="text-center text-4xl">Privacy Policy</h1>
        </div>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Definitions</h2>
          </section>
          <section>
            <p>
              Coffeastock is owned by Maiko Miyazaki, based in Ireland. (referred to as "I", "Me", "Our" or "We"). As a customer of this 
              service you're a "User" or "You" according to this policy. The applications or any services offered by us will be referred 
              to as "Coffeastock", "App", "Website" or "Service".
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">How does Coffeastock collect data about me?</h2>
          </section>
          <section>
            <p>
              Coffeastock collects data about you:
            </p>
            <ol className="list-disc">
              <li>when you browse the Coffeastock website, coffeastock.com</li>
              <li>when you create an Coffeastock account or update your account</li>
              <li>when you send support, privacy, legal, and other requests to us</li>
            </ol>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">What data does Coffeastock collect about me, and why?</h2>
          </section>
          <section>
            <h3>Coffeastock collects coffee, recipes and custom ranges data.</h3>
            <p>
              When you add coffee collections, recipes, coffee or recipes custom ranges on the Coffeastock client app, Coffeastock 
              stores them in the Coffeastock servers. The data is associated with your Coffeastock account.
            </p>
          </section>
          <section>
            <h3>Coffeastock collects data about how you use Coffeastock service.</h3>
            <p>
              When you use the Coffeastock client apps or the Coffeastock website, Coffeastock logs data that might 
              be identified to you:
            </p>
            <ol className="list-disc">
              <li>a random, unique identifier</li>
              <li>the version of the Coffeastock app, and the operating system you are using</li>
              <li>network request data, such as the date and time, your IP address, and the URL</li>
              <li>number of coffee collections, recipes, custom ranges and the total data size of them</li>
            </ol>
            <p>
              Coffeastock uses this data to:
            </p>
            <ol className="list-disc">
              <li>keep our service working quickly and reliably</li>
              <li>debug and develop our apps and website</li>
              <li>defend Coffeastock service from abuse and technical attacks</li>
              <li>improve search results on the website</li>
              <li>improve usability of our apps</li>
            </ol>
            <p>
              Coffeastock usually deletes log entries with identifiable information within a few weeks, but may preserve logs longer, 
              as needed in specific cases, like investigations of specific incidents.
            </p>
          </section>
          <section>
            <h3>Coffeastock collects data about how you use the website.</h3>
            <p>
              When you visit coffeastock.com, api.coffeastock.app, and other Coffeastock websites, Coffeastock 
              uses cookies, server logs, and other methods to collect data about what pages you visit, and when. Coffeastock also 
              collects technical information about the software and computer you use, such as:
            </p>
            <ol className="list-disc">
              <li>your IP address</li>
              <li>your preferred language</li>
              <li>the web browser software you use</li>
              <li>the kind of computer you use</li>
              <li>the website that referred you</li>
            </ol>
            <p>
              Coffeastock uses data about how you use the website to:
            </p>
            <ol className="list-disc">
              <li>optimize the website, so that it's quick and easy to use</li>
              <li>diagnose and debug technical errors</li>
              <li>defend the website from abuse and technical attacks</li>
              <li>compile statistics on package popularity</li>
              <li>compile statistics on the kinds of software and computers visitors use</li>
              <li>compile statistics on visitor searches and needs, to guide development of new website pages and functionality</li>
              <li>decide who to contact about about product announcements, service changes, and new features</li>
            </ol>
            <p>
              Coffeastock usually deletes website log entries with identifiable information within a few weeks, but keeps entries 
              for visitors with Coffeastock accounts longer. Coffeastock reviews log entries for those users twice a year, and deletes 
              entries when they're no longer needed.
            </p>
            <p>
              Coffeastock may preserve log entries for all kinds of visitors longer, as needed in specific cases, like investigation 
              of specific incidents. Coffeastock stores aggregate statistics indefinitely, but those statistics don't include data 
              identifiable to you personally.
            </p>
          </section>
          <section>
            <h3>Coffeastock collects account data.</h3>
            <p>
              Basically Coffeastock services require an Coffeastock account. For example, you must have an Coffeastock account to use the Coffeastock 
              client apps.
            </p>
            <p>
              To create an Coffeastock account, Coffeastock requires a working email address. Coffeastock uses this data to provide you access 
              to features and identify you across Coffeastock service, publicly and within Coffeastock.
            </p>
            <p>
              You do not have to give your personal or legal name to create an Coffeastock account. You can use a pseudonym instead. 
              You can also open more than one account.
            </p>
            <p>
              You don't have to give Coffeastock a personal name or any social media names, and you can erase this data at any time.
            </p>
            <p>
              Coffeastock uses your email to:
            </p>
            <ol className="list-disc">
              <li>confirm if your email address is correct to sign you up</li>
              <li>notify you when beta version ends in 3 days</li>
              <li>notify you about your free trial expires in 3 days</li>
              <li>notify you about your free trial has been expired</li>
              <li>notify you about your payment failure</li>
              <li>notify you about your account has been deactivated because of payment failure</li>
              <li>notify you about your annual subscription renewal 3 days before</li>
              <li>contact you in special circumstances related to your account</li>
              <li>contact you about support requests</li>
              <li>contact you about legal requests, like DMCA takedown requests and privacy complaints</li>
              <li>announce new Coffeastock product offerings, service changes, and features</li>
            </ol>
            <p>
              Coffeastock stores account data as long as the account stays open.
            </p>
          </section>
          <section>
            <h3>Coffeastock collects payment card data.</h3>
            <p>
              To continue using Coffeastock service after expiring the beta version or free trial, Coffeastock requires your payment card data. 
              Coffeastock itself does not collect or store enough information to charge your card itself. Rather, Stripe collects that data on 
              Coffeastock's behalf, and gives Coffeastock security tokens that allow Coffeastock to create charges and subscriptions. 
              Stripe meets the highest level of PCI compliance (Level 1). See more on their Security page.
            </p>
            <p>
              Coffeastock uses your payment card data only to charge for Coffeastock service.
            </p>
            <p>
              Coffeastock instructs Stripe to store your payment card data only as long as you use paid Coffeastock service.
            </p>
          </section>
          <section>
            <h3>Coffeastock collects billing address.</h3>
            <p>
              All listed fees and any amounts payable are net amounts exclusive of possibly applicable VAT, sales tax, or any other 
              applicable taxes and charges imposed by any government entity in connection with your use of the Service. 
              Coffeastock collects your billing address in order to evaluate the applicable VAT.
            </p>
            <p>
              Coffeastock stores it safely on Stripe.
            </p>
          </section>
          <section>
            <h3>Coffeastock collects data about correspondence.</h3>
            <p>
              Coffeastock collects data about you when you send Coffeastock support requests, legal complaints, privacy inquiries, and 
              business inquiries. Those data usually include your name and email address, and may include your company or other 
              affiliation.
            </p>
            <p>
              Coffeastock uses contact data to:
            </p>
            <ol className="list-disc">
              <li>correspond to you</li>
              <li>compile aggregate statistics about correspondence</li>
              <li>train support staff and other Coffeastock personnel</li>
              <li>review the performance of Coffeastock personnel who respond</li>
              <li>defend Coffeastock from legal claims</li>
            </ol>
            <p>
              Coffeastock stores correspondence as long as it may be useful for these purposes.
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Where does Coffeastock keep data about me?</h2>
          </section>
          <section>
            <p>
              Coffeastock stores account data, coffee collections, recipes, custom ranges, and data about website use on servers in 
              Ireland and sometimes retrieve those data to my personal computers in Ireland. I use the data to develop, debug and 
              maintain the service. The data is erased from my computers when no longer needed.
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Does Coffeastock comply with the EU General Data Protection Regulation?</h2>
          </section>
          <section>
            <p>
              Coffeastock respects privacy rights under Regulation (EU) 2016/679, the European Union's General Data Protection 
              Regulation (GDPR). Information that GDPR requires Coffeastock to give can be found throughout these privacy questions 
              and answers. So can information about specific rights, like access, rectification, erasure, data portability, and 
              objection to automated decision-making.
            </p>
            <p>
              GDPR does not apply to everyone worldwide. But Coffeastock's policy is to do its best to offer all users the same privacy 
              information, control, and protections, whether GDPR applies to them or not.
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">How can I change or erase data about me?</h2>
          </section>
          <section>
            {/* <p>
              You can change your account data and payment card data at any time by visiting your account settings page on coffeastock.com/account.
            </p> */}
            <p>
              You can close your Coffeastock account at any time through coffeastock.com/account. Closing your account starts a process of erasing 
              Coffeastock's records of your account data including nickname, email address, and password. Within 30 days of closing account, your coffee 
              collections, recipes, and custom ranges will be completely erased.
            </p>
            <p>
              If you have questions or problems using the website to change or delete data about you, email support@coffeastock.com.
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Does Coffeastock share data about me with others?</h2>
          </section>
          <section>
            <p>
              Coffeastock shares account data with others as mentioned in the section about account data.
            </p>
            <p>
              Coffeastock does not sell information about you to others. However, Coffeastock uses services provided by other companies 
              to provide Coffeastock service. Some of those services may collect data about you independently, for their own purposes. 
              All of the companies are based in the United States.
            </p>
          </section>
          <section>
            <h3>Coffeastock uses Hubspot Contact.</h3>
            <p>
              Coffeastock's website uses Hubspot Contact to store and manage the subscription list. 
              Further information on data protection at Hubspot can be found at https://legal.hubspot.com/security.
            </p>
          </section>
          <section>
            <h3>Coffeastock uses cloud computing platforms.</h3>
            <p>
              Coffeastock uses Amazon Web Services servers and services, in service regions all across the world, to power the 
              Coffeastock services. You can read the privacy policy at https://aws.amazon.com/privacy/.
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Does Coffeastock make automated decisions based on data about me?</h2>
          </section>
          <section>
            <p>
              No. Coffeastock does not use your data for personalization or retargeting purposes.
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">Who can I contact about Coffeastock and my privacy?</h2>
          </section>
          <section>
            <p>
              You can send questions or complaints to:
            </p>
            <p>
              Maiko Miyazaki<br/>
              maikomiyazaki@Coffeastock.com<br/>
              162, Block 11, Allendale Square<br/>
              Clonsilla, Dublin<br/>
              D15 E5CR<br/>
              Ireland
            </p>
          </section>
        </article>

        <article>
          <section>
            <h2 className="text-2xl mb-5">How can I find out about changes?</h2>
          </section>
          <section>
            <p>
              Coffeastock will announce the next version on the Coffeastock app dashboard. 
              In the meantime, Coffeastock may update its contact information and minor 
              changes by updating the page at Privacy Policy, without an announcement. Coffeastock may change how it announces changes in future 
              privacy versions.
            </p>
          </section>
        </article>
      </main>
      <PublicFooter />
    </div>
  )
}

export default Privacy