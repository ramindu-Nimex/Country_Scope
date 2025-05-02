import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-lime-600 shadow-md">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sms:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-2 relative overflow-hidden">
                  {/* Creative logo representing world continents */}
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500 to-teal-600 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Stylized continent shapes */}
                    <div className="w-6 h-6 bg-lime-300 dark:bg-lime-400 opacity-80 rounded-tr-full rounded-bl-full transform rotate-45 translate-x-1 translate-y-0.5"></div>
                    <div className="absolute w-5 h-5 bg-teal-400 dark:bg-teal-300 opacity-90 rounded-tl-full rounded-br-full transform -rotate-12 -translate-x-1.5 -translate-y-1"></div>
                    <div className="absolute w-2 h-2 bg-green-300 dark:bg-green-200 rounded-full transform translate-x-2 translate-y-2"></div>
                  </div>
                </div>
                <div className="font-bold tracking-tight text-base md:text-2xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-500 dark:from-lime-400 dark:to-green-400">
                    Country
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-700 dark:from-green-400 dark:to-teal-400">
                    Scope
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sms:grid-cols-3 md:grid-cols-4 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Services
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Partners
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Facebook
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms & Condition
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Connect With Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  + 71 2345 6789
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  + 71 2345 6789
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="my-5" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="CountryScope"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsLinkedin} />
            <Footer.Icon href="#" icon={BsWhatsapp} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
