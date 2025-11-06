"use client";
import { Toast } from "@base-ui-components/react/toast";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";

export default function ToastDemo() {
  return (
    <Toast.Provider>
      <ToastButton />
      <Toast.Portal>
        <Toast.Viewport className="fixed z-10 top-auto right-[1rem] bottom-[1rem] mx-auto flex w-[250px] sm:right-[2rem] sm:bottom-[2rem] sm:w-[300px]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastButton() {
  const toastManager = Toast.useToastManager();

  function runPromise() {
    toastManager.promise(
      // Simulate an API request with a promise that resolves after 2 seconds
      new Promise<string>((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.3; // 70% success rate
        setTimeout(() => {
          if (shouldSucceed) {
            resolve("operation completed");
          } else {
            reject(new Error("operation failed"));
          }
        }, 2000);
      }),
      {
        loading: "Loading data...",
        success: (data: string) => `Success: ${data}`,
        error: (err: Error) => `Error: ${err.message}`,
      }
    );
  }

  return (
    <button
      type="button"
      className="box-border flex h-10 items-center justify-center rounded-md border border-[#D32F2F] bg-[#B71C1C] px-3.5 py-0 font-medium text-white outline-0 select-none hover:bg-[#D32F2F] focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[#D32F2F] active:bg-[#D32F2F] transition-colors"
      onClick={runPromise}
    >
      Create toast
    </button>
  );
}

function getToastType(toast: any): "success" | "error" | "loading" {
  const title = toast.title?.toLowerCase() || "";
  const description = toast.description?.toLowerCase() || "";

  if (title.includes("success") || description.includes("success")) {
    return "success";
  }
  if (title.includes("error") || description.includes("error")) {
    return "error";
  }
  return "loading";
}

function getToastStyles(type: "success" | "error" | "loading") {
  switch (type) {
    case "success":
      return {
        container: "border-[#4CAF50] bg-[#2C2C2C]",
        icon: <FaCheckCircle className="h-5 w-5 text-[#4CAF50]" />,
        titleColor: "text-[#4CAF50]",
        descriptionColor: "text-[#BDBDBD]",
      };
    case "error":
      return {
        container: "border-[#D32F2F] bg-[#2C2C2C]",
        icon: <FaExclamationCircle className="h-5 w-5 text-[#D32F2F]" />,
        titleColor: "text-[#D32F2F]",
        descriptionColor: "text-[#BDBDBD]",
      };
    case "loading":
      return {
        container: "border-[#4A4A4A] bg-[#2C2C2C]",
        icon: <FaSpinner className="h-5 w-5 text-[#BDBDBD] animate-spin" />,
        titleColor: "text-white",
        descriptionColor: "text-[#BDBDBD]",
      };
  }
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => {
    const toastType = getToastType(toast);
    const styles = getToastStyles(toastType);

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={`${styles.container} [--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] rounded-lg border-2 bg-clip-padding p-4 shadow-lg select-none transition-all duration-300 ease-out after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[starting-style]:opacity-0 data-[starting-style]:[transform:translateY(150%)] data-[ending-style]:opacity-0 data-[ending-style]:duration-200 data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-[limited]:opacity-0 [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)] data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]`}
      >
        <Toast.Content className="overflow-hidden transition-opacity duration-250 data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
            <div className="flex-1 min-w-0">
              <Toast.Title
                className={`text-[0.975rem] leading-5 font-semibold ${styles.titleColor}`}
              />
              <Toast.Description
                className={`text-[0.925rem] leading-5 mt-1 ${styles.descriptionColor}`}
              />
            </div>
          </div>
          <Toast.Close
            className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded border-none bg-transparent text-[#BDBDBD] hover:bg-[#4A4A4A] hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes className="h-3 w-3" />
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}
