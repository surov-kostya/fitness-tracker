export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    state?: 'complete' | 'closed' | null;
}
