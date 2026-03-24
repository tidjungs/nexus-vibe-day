import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GrowthChart } from '../GrowthChart';

describe('GrowthChart', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<GrowthChart />);
      expect(screen.getByText('Growth Projection')).toBeInTheDocument();
    });

    it('should render all period buttons', () => {
      render(<GrowthChart />);
      expect(screen.getByRole('button', { name: '1W' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '1M' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '3M' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '1Y' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'ALL' })).toBeInTheDocument();
    });

    it('should render month labels', () => {
      render(<GrowthChart />);
      expect(screen.getByText('JAN')).toBeInTheDocument();
      expect(screen.getByText('OCT')).toBeInTheDocument();
    });
  });

  describe('Period Selection', () => {
    it('should have 1W as the initial active period', () => {
      render(<GrowthChart />);
      const button1W = screen.getByRole('button', { name: '1W' });
      expect(button1W).toHaveClass('bg-primary');
    });

    it('should update active period when period button is clicked', () => {
      render(<GrowthChart />);
      const button1M = screen.getByRole('button', { name: '1M' });

      fireEvent.click(button1M);

      expect(button1M).toHaveClass('bg-primary');
      expect(screen.getByRole('button', { name: '1W' })).not.toHaveClass('bg-primary');
    });

    it('should switch between different periods', () => {
      render(<GrowthChart />);

      const button3M = screen.getByRole('button', { name: '3M' });
      fireEvent.click(button3M);
      expect(button3M).toHaveClass('bg-primary');

      const button1Y = screen.getByRole('button', { name: '1Y' });
      fireEvent.click(button1Y);
      expect(button1Y).toHaveClass('bg-primary');
      expect(button3M).not.toHaveClass('bg-primary');
    });

    it('should apply correct styling to inactive period buttons', () => {
      render(<GrowthChart />);
      const button1M = screen.getByRole('button', { name: '1M' });

      expect(button1M).toHaveClass('bg-white');
      expect(button1M).toHaveClass('text-on-surface-variant');
    });

    it('should display correct number of bars for the selected period', () => {
      render(<GrowthChart />);

      // Each period should have 10 bars
      const bars = document.querySelectorAll('.flex-1');
      expect(bars.length).toBe(10);

      // Switch period and verify same number of bars
      fireEvent.click(screen.getByRole('button', { name: 'ALL' }));
      const barsAfter = document.querySelectorAll('.flex-1');
      expect(barsAfter.length).toBe(10);
    });
  });

  describe('Chart Display', () => {
    it('should render chart container with correct height', () => {
      render(<GrowthChart />);
      const chartContainer = document.querySelector('.h-64');
      expect(chartContainer).toBeInTheDocument();
    });

    it('should apply hover opacity transition on bars', () => {
      render(<GrowthChart />);
      const bars = document.querySelectorAll('.hover\\:opacity-80');
      expect(bars.length).toBeGreaterThan(0);
    });
  });
});
