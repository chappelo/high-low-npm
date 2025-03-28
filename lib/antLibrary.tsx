"use client";

import React from "react";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

interface StyledComponentsRegistryProps {
  children: React.ReactNode;
}

const StyledComponentsRegistry: React.FC<StyledComponentsRegistryProps> = ({
  children,
}) => {
  const cache = React.useMemo(() => createCache(), []);

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
