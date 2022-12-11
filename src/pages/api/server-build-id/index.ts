const serverBuildID = (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {(arg0: {serverBuildID: string | undefined}): void; new (): any};
    };
  }
) => {
  console.log('🚀 ~ file: index.ts:2 ~ serverBuildID ~ req', req);
  res.status(200).json({serverBuildID: process.env.NEXT_PUBLIC_GIT_COMMIT_SHA});
};
export default serverBuildID;
