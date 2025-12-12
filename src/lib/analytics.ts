// Analytics utility for tracking custom events in GA4

declare global {
    interface Window {
        gtag?: (
            command: string,
            eventName: string,
            params?: Record<string, any>
        ) => void;
    }
}

export const trackEvent = (
    eventName: string,
    params?: Record<string, any>
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
};

// Track image upload
export const trackImageUpload = (toolName: string, fileSize: number, fileType: string) => {
    trackEvent('image_upload', {
        tool_name: toolName,
        file_size: fileSize,
        file_type: fileType,
    });
};

// Track image download
export const trackImageDownload = (toolName: string, fileSize: number, fileType: string) => {
    trackEvent('image_download', {
        tool_name: toolName,
        file_size: fileSize,
        file_type: fileType,
    });
};

// Track tool conversion (complete flow)
export const trackToolConversion = (toolName: string, processingTime: number) => {
    trackEvent('tool_conversion', {
        tool_name: toolName,
        processing_time: processingTime,
    });
};

// Track time spent on tool
export const trackTimeOnTool = (toolName: string, timeSpent: number) => {
    trackEvent('time_on_tool', {
        tool_name: toolName,
        time_spent: timeSpent,
    });
};

// Track 404 errors
export const track404Error = (path: string, referrer: string) => {
    trackEvent('404_error', {
        page_path: path,
        referrer: referrer,
    });
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
    trackEvent('search', {
        search_term: query,
        results_count: resultsCount,
    });
};

// Track email capture
export const trackEmailCapture = (source: string) => {
    trackEvent('email_capture', {
        source: source,
    });
};

// Track bookmark prompt interaction
export const trackBookmarkPrompt = (action: 'shown' | 'accepted' | 'dismissed') => {
    trackEvent('bookmark_prompt', {
        action: action,
    });
};
