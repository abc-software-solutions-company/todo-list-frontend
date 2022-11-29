export const iframeYoutube = (url: string) => {
  return `<div class="iframe-youtube" style="
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  margin-bottom: 36px;
">
<iframe class="responsive-iframe" src=${url} style="
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
" frameborder="0" allowfullscreen></iframe>
</div>
`;
};
