{ pkgs }: {
  deps = [
    pkgs.yarn
    pkgs.nodejs-16_x
    pkgs.vite
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}