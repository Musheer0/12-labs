"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSpaceBear } from "@/hooks/use-space-bear";
import { cn } from "@/lib/utils";

interface VoiceAvatarProps {
  seed: string;
  name: string;
  className?: string;
}

export function VoiceAvatar({ seed, name, className }: VoiceAvatarProps) {
  const avatarUrl = useSpaceBear(seed);

  return (
    <Avatar className={cn("size-4 border-white shadow-xs", className)}>
      <AvatarImage src={avatarUrl!} alt={name} />
      <AvatarFallback className="text-[8px]">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
