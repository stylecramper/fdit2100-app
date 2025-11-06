import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Tag from '@/components/ui/posts/Tag';

const tagText = 'crime';

describe('Tag component', () => {
    test('Return a span tag that contains the text of the `tag` prop', () => {
        const view = render(<Tag tag={tagText} />);
        expect(view).not.toBeNull();

        const span = screen.findByText(tagText);
        expect(span).not.toBeNull();
    });
});
