import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import React, { useEffect, useRef } from 'react';

export default function Home() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "5",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);

    const enterFullscreen = () => {
      if (container.current) {
        if (container.current.requestFullscreen) {
          container.current.requestFullscreen();
        } else if (container.current.mozRequestFullScreen) {
          container.current.mozRequestFullScreen();
        } else if (container.current.webkitRequestFullscreen) {
          container.current.webkitRequestFullscreen();
        } else if (container.current.msRequestFullscreen) {
          container.current.msRequestFullscreen();
        }
      }
    };

    // Request fullscreen when the component mounts
    enterFullscreen();
  }, []);

  return (
    <>
      <Head>
        <title>TradingView Chart</title>
      </Head>
      <Header />
      <div ref={container} style={{ height: '100vh', width: '100vw', position: 'relative' }}>
        <div className="tradingview-widget-container" style={{ height: '100%', width: '100%' }}>
          <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
          <div className="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
              <span className="blue-text">Track all markets on TradingView</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
