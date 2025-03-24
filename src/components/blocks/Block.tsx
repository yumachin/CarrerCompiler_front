"use client";

import { useState } from "react";

import Header from './header/Header';
import Menu from './menu/Menu';

export default function Block() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header setOpen={setOpen} />
      <Menu open={open} />
    </>
  );
};