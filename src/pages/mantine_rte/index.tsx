import {useEffect, useState} from 'react';

export default function IndexPage() {
  const initialValue = '<p>Rich text editor content</p>';

  const [value, onChange] = useState(initialValue);
  const [isDocument, setIsDocument] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsDocument(true);
  }, []);

  if (!isDocument) return <p className="bg-amber-300">Now Loading</p>;

  if (isDocument) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {RichTextEditor} = require('@mantine/rte');
    return <RichTextEditor value={value} onChange={onChange} id="rte" />;
  }
}
