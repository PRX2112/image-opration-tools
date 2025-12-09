export interface PlanFeature {
    text: string;
    included: boolean;
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    currency: string;
    features: PlanFeature[];
    limits: {
        maxFileSize: number; // in bytes
        downloadsPerMonth: number;
        storageLimit: number; // in bytes
    };
    popular?: boolean;
    razorpayPlanId?: {
        monthly?: string;
        yearly?: string;
    };
}

export const PLANS: Record<string, Plan> = {
    free: {
        id: 'free',
        name: 'Free',
        description: 'Perfect for trying out ResizeMe',
        price: {
            monthly: 0,
            yearly: 0,
        },
        currency: 'INR',
        features: [
            { text: 'Basic image tools', included: true },
            { text: '10MB file size limit', included: true },
            { text: '50 downloads per month', included: true },
            { text: 'No image history', included: false },
            { text: 'Standard support', included: true },
            { text: 'AI upscaling', included: false },
            { text: 'Priority processing', included: false },
        ],
        limits: {
            maxFileSize: 10 * 1024 * 1024, // 10MB
            downloadsPerMonth: 50,
            storageLimit: 0, // No storage for free plan
        },
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        description: 'For professionals and power users',
        price: {
            monthly: 299,
            yearly: 2999, // ~₹250/month when billed yearly
        },
        currency: 'INR',
        features: [
            { text: 'All image tools', included: true },
            { text: '200MB file size limit', included: true },
            { text: '500 downloads per month', included: true },
            { text: 'Image history & cloud storage', included: true },
            { text: 'Priority support', included: true },
            { text: 'AI upscaling', included: true },
            { text: 'Batch processing', included: true },
        ],
        limits: {
            maxFileSize: 200 * 1024 * 1024, // 200MB
            downloadsPerMonth: 500,
            storageLimit: 1024 * 1024 * 1024, // 1GB
        },
        popular: true,
        razorpayPlanId: {
            // These will be created in Razorpay dashboard
            monthly: 'plan_Rp8hABbIJJiShZ',
            yearly: 'plan_Rp8k8g42wFHcYR',
        },
    },
    business: {
        id: 'business',
        name: 'Business',
        description: 'For teams and businesses',
        price: {
            monthly: 999,
            yearly: 9999, // ~₹833/month when billed yearly
        },
        currency: 'INR',
        features: [
            { text: 'All Pro features', included: true },
            { text: 'Unlimited file size', included: true },
            { text: 'Unlimited downloads', included: true },
            { text: 'Unlimited cloud storage', included: true },
            { text: 'Priority support', included: true },
            { text: 'API access', included: true },
            { text: 'Custom branding', included: true },
            { text: 'Team collaboration', included: true },
        ],
        limits: {
            maxFileSize: Infinity,
            downloadsPerMonth: Infinity,
            storageLimit: Infinity,
        },
        razorpayPlanId: {
            monthly: 'plan_Rp8lIfjg5FKkXC',
            yearly: 'plan_Rp8m8KaC4aJlLW',
        },
    },
};

export const getPlanById = (planId: string): Plan | undefined => {
    return PLANS[planId];
};

export const getPlanLimits = (planId: string) => {
    const plan = getPlanById(planId);
    return plan?.limits || PLANS.free.limits;
};

export const formatPrice = (price: number, currency: string = 'INR'): string => {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(price);
};
