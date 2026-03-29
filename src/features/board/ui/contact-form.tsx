"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  type InquiryFormValues,
  inquiryFormSchema,
} from "@/types/allrecords.types";
import { useKakaoMessageMutation } from "../../about/hooks/about.hooks";

function ContactForm() {
  const {
    mutate: onSubmit,
    isPending,
    isSuccess,
    status,
    error,
  } = useKakaoMessageMutation();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (values: InquiryFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);
      onSubmit(formData);

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) form.reset();
  }, [isSuccess, form]);

  useEffect(() => {
    if (error) {
      console.error("Form submission error:", error);
      toast.error("문의 전송 중 오류가 발생했습니다.");
    }
  }, [error]);

  return (
    <Card className="mx-auto w-full border-none bg-[#DBFD00] p-0 shadow-none sm:w-sm sm:max-w-sm">
      <CardHeader className="px-0 py-4">
        <CardTitle className="flex items-center gap-2 text-[#00bfff] text-[13px] sm:text-base">
          궁금한 점이나 문의사항을 남겨주세요.
        </CardTitle>
        <CardDescription className="hidden">
          빠른 시일 내에 답변드리겠습니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이름을 입력하세요"
                      {...field}
                      disabled={isPending}
                      className="border-black bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                      disabled={isPending}
                      className="border-black bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메시지</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="문의 내용을 적어주세요..."
                      className="resize-none border-black bg-white"
                      rows={4}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="hidden">
                    {field.value.length}/1000자
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-6 w-full cursor-pointer bg-[#963900] hover:bg-[#963900]/90"
              disabled={isPending}
            >
              {isPending ? "전송 중..." : "문의 전송"}
            </Button>
          </form>
        </Form>

        {/* 상태별 알림 메시지 */}
        {status === "success" && (
          <Alert className="border-black bg-white">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              문의가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </AlertDescription>
          </Alert>
        )}
        <div className="aspect-[405/217] w-full bg-[url('/cat-care.webp')] bg-center bg-cover bg-no-repeat" />
      </CardContent>
    </Card>
  );
}

export default ContactForm;
