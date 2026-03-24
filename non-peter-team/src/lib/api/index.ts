import { Portfolio, PortfolioSummary, AssetHolding, Asset } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Portfolio endpoints
export async function getPortfolios(): Promise<Portfolio[]> {
  const res = await fetch(`${API_BASE}/portfolios`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch portfolios');
  return res.json();
}

export async function getPortfolio(id: string): Promise<PortfolioSummary> {
  const res = await fetch(`${API_BASE}/portfolios/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch portfolio');
  return res.json();
}

export async function createPortfolio(data: Partial<Portfolio>): Promise<Portfolio> {
  const res = await fetch(`${API_BASE}/portfolios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create portfolio');
  return res.json();
}

// Asset endpoints
export async function getAssets(): Promise<Asset[]> {
  const res = await fetch(`${API_BASE}/assets`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch assets');
  return res.json();
}

export async function getAsset(id: string): Promise<Asset> {
  const res = await fetch(`${API_BASE}/assets/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch asset');
  return res.json();
}

// Holdings endpoints
export async function getHoldings(portfolioId: string): Promise<AssetHolding[]> {
  const res = await fetch(`${API_BASE}/portfolios/${portfolioId}/holdings`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch holdings');
  return res.json();
}

export async function addHolding(portfolioId: string, data: Partial<AssetHolding>): Promise<AssetHolding> {
  const res = await fetch(`${API_BASE}/portfolios/${portfolioId}/holdings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add holding');
  return res.json();
}
