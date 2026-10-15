# O celular de Diogo — ARG

Protótipo estático de ARG de terror psicológico. Funciona no navegador e pode ser publicado no GitHub Pages, sem servidor, API ou dependências externas.

## Executar localmente
Abra `index.html` no navegador. Para uma experiência de desenvolvimento mais consistente, use a extensão Live Server do VS Code ou qualquer servidor estático local.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e a pasta `assets/` para a raiz do repositório.
3. Em **Settings → Pages**, escolha a branch principal e a pasta `/ (root)`.
4. Salve e aguarde a publicação.

Todos os caminhos de assets são relativos, então o projeto também funciona em um subdiretório do GitHub Pages.

## Personalizar
Abra `script.js`:
- `CONFIG.lockPassword`: senha inicial do celular (padrão `1234`).
- `CONFIG.archivePassword`: está como `null`, mantendo as conversas arquivadas inacessíveis. Quando decidir a senha, substitua `null` por uma string, por exemplo `"SUA_SENHA"`. O conteúdo arquivado ainda precisa ser escrito/adicionado por você.
- `MESSAGES`: mensagens, datas, horários, chamadas embutidas e áudio.
- `CALLS`: histórico de ligações; `status` pode ser `perdida` ou `atendida`, com `duration` para atendidas.

## Imagens
As imagens fornecidas foram copiadas para `assets/images/`:
- `lockscreen-wallpaper.jpg`
- `home-wallpaper.jpg`
- `profile-eliudo.jpg`
- `chat-reference.jpg`
- `calls-reference.jpg`

As referências de conversa, perfil e ligações são materiais de referência visual; você pode substituir os arquivos por imagens recortadas/otimizadas para cada uso. Para trocar os papéis de parede, substitua os arquivos mantendo os mesmos nomes.

## Funcionalidades incluídas
- Tela de bloqueio com PIN funcional `1234`.
- Tela inicial com widgets e ícones.
- WhatsApp fictício com abas Conversas, Atualizações, Comunidades e Ligações.
- Apenas a conversa Eliudo aparece na lista principal.
- Conversa com histórico, separadores, indicadores de leitura, chamadas e áudio bloqueado.
- O áudio nunca é reproduzido; após tentativa, mostra erro.
- Histórico de chamadas perdidas e atendidas com tela de detalhes.
- Configurações simplificadas.
- Área arquivada com senha configurável e bloqueada enquanto a configuração está `null`.
- Navegação Android, mensagens de feedback e layout responsivo.

## Limitações honestas
- O histórico, chamadas e notificações são dados fictícios locais; nenhuma chamada ou mensagem real é feita.
- A senha está no JavaScript do cliente. Ela serve como mecânica narrativa, não como segurança real.
- O botão de áudio simula uma falha de reprodução, sem carregar um arquivo sonoro.
- O protótipo não armazena progresso entre sessões.


## Identidade dos personagens
- **Diogo** é o dono do aparelho e o perfil exibido nas configurações.
- **Eliudo** é o contato investigado; sua foto de perfil é carregada de `assets/images/profile-eliudo.jpg`.
- Para trocar a foto de Eliudo, substitua esse arquivo mantendo o mesmo nome e formato.
