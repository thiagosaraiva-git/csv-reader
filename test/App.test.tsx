import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App test', () => {

    test('App should be defined', () => {
        expect(typeof App).toBeDefined();
    });
    
    test('App should render', () => {
        render(<App />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

});
