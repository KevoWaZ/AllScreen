"use client";
import { Toast } from "@base-ui-components/react/toast";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useEffect, useRef } from "react";

interface ToastProps {
  statusText: string;
  status: number;
}

function getToastStyles(status: number) {
  // Status 2xx = succès
  if (status >= 200 && status < 300) {
    return {
      container: "border-[#4CAF50] bg-[#2C2C2C]",
      icon: <FaCheckCircle className="h-5 w-5 text-[#4CAF50]" />,
      titleColor: "text-[#4CAF50]",
      descriptionColor: "text-[#BDBDBD]",
      title: "Succès",
    };
  }
  // Status 4xx ou 5xx = erreur
  return {
    container: "border-[#D32F2F] bg-[#2C2C2C]",
    icon: <FaExclamationCircle className="h-5 w-5 text-[#D32F2F]" />,
    titleColor: "text-[#D32F2F]",
    descriptionColor: "text-[#BDBDBD]",
    title: "Erreur",
  };
}

export default function ToastComponent({ statusText, status }: ToastProps) {
  return (
    <Toast.Provider>
      <AutoTriggerToast statusText={statusText} status={status} />
      <Toast.Portal>
        <Toast.Viewport className="fixed z-10 top-auto right-4 bottom-4 mx-auto flex w-[250px] sm:right-8 sm:bottom-8 sm:w-[300px]">
          <ToastList statusText={statusText} status={status} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function AutoTriggerToast({ statusText, status }: ToastProps) {
  const toastManager = Toast.useToastManager();
  const hasAddedToast = useRef(false);

  useEffect(() => {
    if (!hasAddedToast.current) {
      const title = status >= 200 && status < 300 ? "Succès" : "Erreur";

      toastManager.add({
        title,
        description: statusText,
      });

      hasAddedToast.current = true;
    }
  }, [statusText, status]);

  return null;
}

function ToastList({ statusText, status }: ToastProps) {
  const { toasts } = Toast.useToastManager();
  const styles = getToastStyles(status);

  return toasts.map((toast) => {
    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={`${styles.container} [--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] rounded-lg border-2 bg-clip-padding p-4 shadow-lg select-none transition-all duration-300 ease-out after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-starting-style:opacity-0 data-starting-style:transform-[translateY(150%)] data-ending-style:opacity-0 data-ending-style:duration-200 data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-limited:opacity-0 [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]`}
      >
        <Toast.Content className="overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">{styles.icon}</div>
            <div className="flex-1 min-w-0">
              <Toast.Title
                className={`text-[0.975rem] leading-5 font-semibold ${styles.titleColor}`}
              >
                {styles.title}
              </Toast.Title>
              <Toast.Description
                className={`text-[0.925rem] leading-5 mt-1 ${styles.descriptionColor}`}
              >
                {statusText}
              </Toast.Description>
            </div>
          </div>
          <Toast.Close
            className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded border-none bg-transparent text-[#BDBDBD] hover:bg-[#4A4A4A] hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <FaTimes className="h-3 w-3" />
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}

export function useToast() {
  const toastManager = Toast.useToastManager();

  const showToast = (statusText: string, status: number) => {
    const title = status >= 200 && status < 300 ? "Succès" : "Erreur";

    toastManager.add({
      title,
      description: statusText,
    });
  };

  return { showToast, toastManager };
}
