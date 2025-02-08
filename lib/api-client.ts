import { IVideo } from "@/models/Video";

type FetchOption = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: Record<string, string>;
}


class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOption = {}
    ):Promise<T> {
        const { method = 'GET', body, headers={} } = options;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        }

    const response = await fetch(`/api/${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        return response.json();
    }

    async getVideos(){
        return this.fetch<IVideo>('/videos');
    }

    async getAVideo(id: string){
        return this.fetch<IVideo>(`/videos/${id}`);
    }

    async createVideo(video: Omit<IVideo, '_id'>){
        return this.fetch<IVideo>('/videos', {
            method: 'POST',
            body: video
        });
    }

}

export const apiClient = new ApiClient();