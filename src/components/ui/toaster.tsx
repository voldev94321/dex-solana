"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, status, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-4 items-center">
              {status == "SUCCESS" ? (
                <div>
                  <FaCircleCheck className="text-green-400 w-8 h-8" />
                </div>
              ) : (
                <div>
                  <IoIosCloseCircle className="text-red-400 w-8 h-8" />
                </div>
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}

                {action}
              </div>
            </div>     
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
