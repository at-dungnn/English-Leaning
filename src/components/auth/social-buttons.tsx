import { signInWithGoogle, signInWithFacebook } from "@/server/auth/actions";
import { Button } from "@/components/ui/button";

// Only renders providers whose OAuth keys are configured in .env.
export function SocialButtons() {
  const hasGoogle = !!process.env.AUTH_GOOGLE_ID;
  const hasFacebook = !!process.env.AUTH_FACEBOOK_ID;

  if (!hasGoogle && !hasFacebook) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">hoặc</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {hasGoogle && (
        <form action={signInWithGoogle}>
          <Button type="submit" variant="outline" className="w-full">
            Tiếp tục với Google
          </Button>
        </form>
      )}
      {hasFacebook && (
        <form action={signInWithFacebook}>
          <Button type="submit" variant="outline" className="w-full">
            Tiếp tục với Facebook
          </Button>
        </form>
      )}
    </div>
  );
}
