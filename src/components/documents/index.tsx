import {useRouter} from 'next/router';
import React, {FC, useEffect} from 'react';

import {useDocumentsStore} from '@/hooks/useDocuments';

import DocumentContent from './content';
import DocumentList from './list';

interface IProps {
  id: string;
}
const Documents: FC<IProps> = ({id}) => {
  const router = useRouter();
  const {document} = useDocumentsStore();
  useEffect(() => {
    router.push('?id=12', undefined, {shallow: true});
  }, []);

  useEffect(() => {}, [router.query.counter]);
  return (
    <div className="flex">
      <DocumentList id={id} />
      <DocumentContent />
    </div>
  );
};

export default Documents;
