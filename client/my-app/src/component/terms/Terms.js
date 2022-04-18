import React from "react";
import "./termsStyle.css";
const Terms = (props) => {
  return (
    <div className="terms">
      <div className="terms-main">
        <h3>Terms of Use</h3>
        <p>
          Our Terms of Use were posted on 10 April 2022 and last updated on 14
          April 2022.
        </p>
        <p>
          Please read these terms and conditions carefully before using Our
          Service.
        </p>
        <h4>Interpretation</h4>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
        <h4>Legal Advice Disclaimer for Our Products</h4>
        <p>
          You understand that we offer legal contracts, policies or agreements
          ("Products"), as created and/or verified by attorneys or paralegals
          for sale through our Service. You acknowledge that We are not
          attorneys or paralegals nor do We offer legal advice. You acknowledge
          that We do not endorse any specific attorney or paralegal or any
          Product as being better than another. We do not otherwise guarantee
          the legal accuracy or applicability of any Product for your legal
          needs. You will at all times look to any attorney or paralegal that
          you select for services as to any legal claims related to such
          services. You understand that it is your responsibility to ensure that
          the privacy policy or any other policies you create with us is
          complete, accurate, and meets your companies specific privacy needs.
        </p>
        <h4>User Accounts</h4>
        <p>
          When You create an account with Us, You must provide Us information
          that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of Your account on Our Service. You are responsible for
          safeguarding the password that You use to access the Service and for
          any activities or actions under Your password, whether Your password
          is with Our Service or a Third-Party Social Media Service. You agree
          not to disclose Your password to any third party. You must notify Us
          immediately upon becoming aware of any breach of security or
          unauthorized use of Your account. You may not use as a username the
          name of another person or entity or that is not lawfully available for
          use, a name or trademark that is subject to any rights of another
          person or entity other than You without appropriate authorization, or
          a name that is otherwise offensive, vulgar or obscene.
        </p>
        <h4>Copyright Policy</h4>
        <p>
          We respect the intellectual property rights of others. It is Our
          policy to respond to any claim that Content posted on the Service
          infringes a copyright or other intellectual property infringement of
          any person. If You are a copyright owner, or authorized on behalf of
          one, and You believe that the copyrighted work has been copied in a
          way that constitutes copyright infringement that is taking place
          through the Service.
        </p>
        <h4>Limitation of Liability</h4>
        <p>
          Notwithstanding any damages that You might incur, the entire liability
          of the Company and any of its suppliers under any provision of this
          Terms and Your exclusive remedy for all of the foregoing shall be
          limited to the amount actually paid by You through the Service or 100
          USD if You haven't purchased anything through the Service. To the
          maximum extent permitted by applicable law, in no event shall the
          Company or its suppliers be liable for any special, incidental,
          indirect, or consequential damages whatsoever (including, but not
          limited to, damages for loss of profits, loss of data or other
          information, for business interruption, for personal injury, loss of
          privacy arising out of or in any way related to the use of or
          inability to use the Service, third-party software and/or third-party
          hardware used with the Service, or otherwise in connection with any
          provision of this Terms), even if the Company or any supplier has been
          advised of the possibility of such damages and even if the remedy
          fails of its essential purpose.
        </p>
        <div className="terms-button">
          <button
            onClick={() => {
              props.setClickTerm(false);
              props.setCheckTerm(true);
            }}
          >
            I agree to the above terms
          </button>
          <button
            onClick={() => {
              props.setClickTerm(false);
              props.setCheckTerm(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
