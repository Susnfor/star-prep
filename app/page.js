// to set variables to generate the questions and timer
'use client';
import CountdownComponent from "./components/CountdownComponent";
import Link from 'next/link'
import InterviewSetup from "./components/InterviewSetup";


export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen">
      <InterviewSetup />



       {/* <Link href="/interview" className="text-blue-500 hover:underline">Start Interview</Link> */}
    </div>
  );
}
