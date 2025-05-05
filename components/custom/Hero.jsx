'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link } from 'lucide-react';
import React, { useContext, useState } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if (userDetail?.token < 10) {
      toast("You don't have enough tokens to generate code.");
      return;
    }
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    router.push('/workspace/' + workspaceId);
  };

  return (
    <div className="flex flex-col items-center mt-32 xl:mt-40 px-4">
      <h1 className="text-5xl font-extrabold text-center tracking-tight text-white">
        {Lookup.HERO_HEADING}
      </h1>
      <p className="text-gray-400 text-center mt-4 max-w-xl text-lg">
        Boost your productivity by generating complete project boilerplates and intelligent code suggestions — instantly.
      </p>

      <div
        className="mt-6 w-full max-w-2xl bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 shadow-lg"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-3">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="w-full h-32 resize-none bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="min-w-[40px] h-10 w-10 p-2 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Link className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-8 max-w-2xl">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <button
            key={index}
            className="text-sm border border-gray-700 text-gray-400 hover:text-white hover:border-white px-3 py-1 rounded-full transition-all duration-200"
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;
