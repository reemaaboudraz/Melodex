import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="page-bg">
      <div className="phone-frame">
        <div className="home-indicator" />
        {children}
      </div>
    </div>
  );
}
