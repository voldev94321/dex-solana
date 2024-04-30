import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function abbreviateTokenAddress(address: string) {
  // Check if the address is valid
  if (typeof address !== 'string') {
      throw new Error('Invalid Solana token address');
  }

  // Abbreviate the address
  const abbreviatedAddress = address.slice(0, 6) + '...' + address.slice(-6);

  return abbreviatedAddress;
}