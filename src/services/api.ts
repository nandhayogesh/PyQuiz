const API_BASE_URL = 'http://localhost:5000/api';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  question_count: number;
}

export interface GameSession {
  session_id: number;
}

export interface GameResult {
  score: number;
  correct_answers: number;
  accuracy: number;
  duration: number;
}

export interface LeaderboardEntry {
  score: number;
  accuracy: number;
  correct_answers: number;
  total_questions: number;
  duration: number;
  created_at: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories');
  }

  // Get random questions for a category
  async getQuestions(categoryId: string, count: number = 10): Promise<Question[]> {
    return this.request<Question[]>(`/questions/${categoryId}?count=${count}`);
  }

  // Create a new game session
  async createGameSession(categoryId: string, totalQuestions: number): Promise<GameSession> {
    return this.request<GameSession>('/game/session', {
      method: 'POST',
      body: JSON.stringify({
        category_id: categoryId,
        total_questions: totalQuestions,
      }),
    });
  }

  // Update game session with results
  async updateGameSession(sessionId: number, results: GameResult): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/game/session/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(results),
    });
  }

  // Get leaderboard
  async getLeaderboard(categoryId?: string, limit: number = 10): Promise<LeaderboardEntry[]> {
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', categoryId);
    params.append('limit', limit.toString());
    
    return this.request<LeaderboardEntry[]>(`/game/leaderboard?${params.toString()}`);
  }
}

export const apiService = new ApiService(); 