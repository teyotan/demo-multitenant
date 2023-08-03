"use client"

import { useUrl } from 'nextjs-current-url';
import { useState, useEffect } from "react";

import useSWR from 'swr'
import { useDomainStore } from '../store';

const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then(res => res.json())

export default function Home() {
  const { href } = useUrl() ?? {href: ""};
  
  const domainStore = useDomainStore()

  const { data } = useSWR(domainStore.domain ? `/api/${domainStore.domain}` : null, fetcher)

  console.log(data)
  
  useEffect(() => {
    let path = ""
    if (href) {
      let splited = href!.split("/")
      path = splited[splited.length-1]
    }

    domainStore.setDomain(path)
  }, [href]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex my-auto place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        URL: {href}
        <br></br>
        Parse into API URL. For example: https://{domainStore.domain}.api.themoonlab.co/v1/
        <br></br>
        -----
        <br></br>
        For demo purpose, calling api to /api/{domainStore.domain}
        <br></br>
        response: {data?.status}
      </div>
    </main>
  )
}
