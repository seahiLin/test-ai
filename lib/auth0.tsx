"use client";

import { Auth0Provider } from "@auth0/auth0-react";

export default function Auth0Wrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider
      domain="dev-748zer0snz0dvbf3.us.auth0.com"
      clientId="8sBNWpxGqNX65XBpzMX8MyFETJmLxftK"
    >
      {children}
    </Auth0Provider>
  );
}
