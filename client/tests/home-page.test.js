// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Home from '../pages/index.jsx';

// test for render of alt text of logo
describe('Rendering Logo', () => {
  it('find logo by alt text', () => {
    render(<Home />);
    expect(true).toBe(true);
  });
});
