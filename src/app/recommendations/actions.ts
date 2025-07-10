'use server';

import { generateRecommendations, type RecommendationsInput, type RecommendationsOutput } from '@/ai/flows/personalized-recommendations';

export async function getRecommendations(input: RecommendationsInput): Promise<RecommendationsOutput> {
    try {
        const recommendations = await generateRecommendations(input);
        return recommendations;
    } catch (error) {
        console.error("Error generating recommendations:", error);
        throw new Error("Failed to get recommendations from AI. Please try again later.");
    }
}
