import { IVideo } from "@/models/Video";
import toast from "react-hot-toast";

type FetchOption = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: Record<string, string>;
};

class ApiClient {
    private async fetch<T>(endpoint: string, options: FetchOption = {}): Promise<T> {
        const { method = 'GET', body, headers = {} } = options;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        };

        try {
            const response = await fetch(`/api/${endpoint}`, {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                // Attempt to parse error message from response
                let error: any;
                try {
                    error = await response.json();
                } catch (e) {
                    error = await response.text();
                }
                return Promise.reject(error);
            }

            return response.json();
        } catch (error: any) {
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }

    async getVideos() {
        return this.fetch<IVideo[]>('videos');  // Should return an array
    }

    async getAVideo(id: string) {
        return this.fetch<IVideo>(`videos/${id}`);
    }

    async createVideo(video: Omit<IVideo, '_id'>) {
        return this.fetch<IVideo>('videos', {
            method: 'POST',
            body: video,
        });
    }

    async login(email: string, password: string) {
        return this.fetch<{ message: string }>('auth/login', {
            method: 'POST',
            body: { email, password },
        });
    }

    async register(email: string, password: string) {
        return this.fetch<{ message: string }>('auth/register', {
            method: 'POST',
            body: { email, password },
        });
    }

    async forgotPassword(email: string) {
        return this.fetch<{ message: string }>('auth/forgot', {
            method: 'POST',
            body: { email },
        });
    }
}

export const apiClient = new ApiClient();
