'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import type { RecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { getRecommendations } from './actions';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  userViewingHabits: z.string().min(20, {
    message: "Please describe your viewing habits in at least 20 characters.",
  }),
});

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationsOutput | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userViewingHabits: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendations(null);

    try {
      const result = await getRecommendations({
        userViewingHabits: data.userViewingHabits,
        feedback: feedback || undefined,
      });
      setRecommendations(result);
      setFeedback(null); // Reset feedback after use
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Personalized Recommendations</CardTitle>
          <CardDescription>
            Tell us what you like, and our AI will suggest your next favorite anime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userViewingHabits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline">Your Viewing Habits</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I love shonen anime with great fight scenes like Jujutsu Kaisen and Naruto. I'm also a fan of psychological thrillers like Death Note. Not a big fan of slice-of-life.'"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="text-center p-8">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Finding your next favorite anime...</p>
        </div>
      )}

      {recommendations && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline">Here are your recommendations!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-headline text-lg font-semibold">Recommended Titles</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {recommendations.recommendations.map((rec) => (
                  <li key={rec}>{rec}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Reasoning</h3>
              <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{recommendations.reasoning}</p>
            </div>
            <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Was this helpful?</p>
                <div className="flex gap-2">
                    <Button variant={feedback === 'Thumbs up' ? 'secondary' : 'outline'} size="sm" onClick={() => setFeedback('Thumbs up')}>
                        <ThumbsUp className="mr-2 h-4 w-4"/> Good
                    </Button>
                    <Button variant={feedback === 'Thumbs down' ? 'secondary' : 'outline'} size="sm" onClick={() => setFeedback('Thumbs down')}>
                        <ThumbsDown className="mr-2 h-4 w-4"/> Bad
                    </Button>
                </div>
            </div>
            <p className="text-xs text-muted-foreground pt-4 border-t">
                {recommendations.editorialGuidelinesPolicy}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
