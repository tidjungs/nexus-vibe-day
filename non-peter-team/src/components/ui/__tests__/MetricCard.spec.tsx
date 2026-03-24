import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from '../MetricCard';

describe('MetricCard', () => {
  describe('Rendering', () => {
    it('should render label and value', () => {
      render(<MetricCard label="Total Portfolio Value" value="THB 1,250,000" />);

      expect(screen.getByText('Total Portfolio Value')).toBeInTheDocument();
      expect(screen.getByText('THB 1,250,000')).toBeInTheDocument();
    });

    it('should render without crashing with required props only', () => {
      const { container } = render(
        <MetricCard label="Test Label" value="Test Value" />
      );

      expect(container.querySelector('.rounded-xl')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <MetricCard
          label="Test"
          value="100"
          className="custom-class"
        />
      );

      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Change Display', () => {
    it('should display change value with positive styling when isPositive is true', () => {
      render(
        <MetricCard
          label="Total Gain/Loss"
          value="THB 150,000"
          change="THB 150,000 (13.64%)"
          isPositive={true}
        />
      );

      const changeElement = screen.getByText('THB 150,000 (13.64%)');
      expect(changeElement).toHaveClass('text-green-600');
    });

    it('should display change value with negative styling when isPositive is false', () => {
      render(
        <MetricCard
          label="Total Gain/Loss"
          value="THB -50,000"
          change="THB -50,000 (-4.55%)"
          isPositive={false}
        />
      );

      const changeElement = screen.getByText('THB -50,000 (-4.55%)');
      expect(changeElement).toHaveClass('text-red-600');
    });

    it('should not render change when not provided', () => {
      const { container } = render(
        <MetricCard label="Total Cost Basis" value="THB 1,100,000" />
      );

      const changeElements = container.querySelectorAll('[class*="text-green"], [class*="text-red"]');
      const changeWithColor = Array.from(changeElements).filter(el =>
        el.classList.contains('text-green-600') || el.classList.contains('text-red-600')
      );

      expect(changeWithColor.length).toBe(0);
    });
  });

  describe('Styling', () => {
    it('should have correct base border and background classes', () => {
      const { container } = render(
        <MetricCard label="Test" value="100" />
      );

      const cardElement = container.querySelector('.rounded-xl');
      expect(cardElement).toHaveClass('border-slate-200');
      expect(cardElement).toHaveClass('bg-white');
    });

    it('should style label with correct typography classes', () => {
      render(<MetricCard label="Total Portfolio Value" value="100" />);

      const labelElement = screen.getByText('Total Portfolio Value');
      expect(labelElement).toHaveClass('text-xs');
      expect(labelElement).toHaveClass('font-medium');
      expect(labelElement).toHaveClass('uppercase');
      expect(labelElement).toHaveClass('text-slate-500');
    });

    it('should style value with monospace tabular formatting', () => {
      render(<MetricCard label="Test" value="THB 1,250,000" />);

      const valueElement = screen.getByText('THB 1,250,000');
      expect(valueElement).toHaveClass('font-mono');
      expect(valueElement).toHaveClass('tabular-nums');
      expect(valueElement).toHaveClass('text-3xl');
    });
  });
});
