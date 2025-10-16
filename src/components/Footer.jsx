import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="w-full bg-gradient-to-r from-red-700 via-red-500 to-red-800 text-black p-8 md:p-16 flex flex-wrap justify-between gap-8">
      <div id="f1">
        <img src="/hotel.svg" alt="Ruby Manor Logo" className="h-24" />
      </div>
      <div id="f2" className="flex flex-col gap-2">
        <h3 className="text-2xl font-black uppercase">Quick Links</h3>
        <h3 className="text-2xl font-black uppercase">Our Services</h3>
        <h3 className="text-2xl font-black uppercase">Contact Us</h3>
      </div>
      <div id="f3" className="flex flex-col gap-2">
        <h3 className="text-2xl font-black uppercase">Follow Us</h3>
        <h3 className="text-2xl font-black uppercase">Terms & Policies</h3>
        <h3 id="scrollToTop" className="text-2xl font-black uppercase cursor-pointer" onClick={scrollToTop}>Back to top</h3>
      </div>
      <div id="f4">
        <h4 className="text-lg font-semibold uppercase leading-relaxed">
          A20, SIDCUP BYPASS <br />
          CHISLEHURST <br />
          KENT <br />
          BR7 6RP <br />
          TEL: 0208 309 0181 <br />
        </h4>
      </div>
    </footer>
  );
};

export default Footer;