# FSW Barber 💈

> Um sistema moderno de agendamento para barbearias, desenvolvido com Next.js 14, TypeScript e Prisma.

## 📱 Sobre o Projeto

O FSW Barber é uma aplicação completa para agendamento de serviços em barbearias, oferecendo uma experiência moderna e intuitiva tanto para clientes quanto para estabelecimentos. O projeto permite que usuários encontrem barbearias próximas, visualizem serviços disponíveis e façam agendamentos de forma prática.

### ✨ Funcionalidades

- 🔍 **Busca de Barbearias**: Encontre estabelecimentos por nome ou tipo de serviço
- 📅 **Sistema de Agendamento**: Agende serviços com data e horário específicos
- 👤 **Autenticação**: Login seguro via Google OAuth
- 📱 **Design Responsivo**: Interface otimizada para mobile e desktop
- ⭐ **Avaliações**: Visualize avaliações e notas dos estabelecimentos
- 📞 **Contato Direto**: Acesso rápido aos contatos das barbearias
- 📊 **Dashboard**: Gerencie seus agendamentos de forma organizada

## 🚀 Tecnologias Utilizadas

### Frontend

- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes UI acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### Backend & Database

- **[Prisma](https://www.prisma.io/)** - ORM e Database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticação

### DevTools

- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/fsw-barber-v2.git
cd fsw-barber-v2
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/fsw_barber"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu_secret_muito_seguro"

# Google OAuth
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
```

### 4. Configure o banco de dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar as migrações
npx prisma migrate dev

# Popular o banco com dados de exemplo
npx prisma db seed
```

### 5. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
├── app/                    # App Router (Next.js 14)
│   ├── _actions/          # Server Actions
│   ├── _components/       # Componentes reutilizáveis
│   ├── _constants/        # Constantes da aplicação
│   ├── _data/            # Funções de acesso aos dados
│   ├── _lib/             # Utilitários e configurações
│   ├── _providers/       # Context Providers
│   ├── api/              # API Routes
│   ├── barbershops/      # Páginas de barbearias
│   └── bookings/         # Páginas de agendamentos
├── prisma/               # Schema e migrações do banco
│   ├── migrations/       # Histórico de migrações
│   └── schema.prisma     # Schema do banco
└── public/               # Arquivos estáticos
```

## 🎯 Scripts Disponíveis

```bash
npm run dev          # Executar em modo de desenvolvimento
npm run build        # Build para produção
npm run start        # Executar build de produção
npm run lint         # Executar ESLint
npm run lint:fix     # Corrigir problemas do ESLint
```

## 📊 Database Schema

O projeto utiliza PostgreSQL com as seguintes entidades principais:

- **User**: Usuários do sistema
- **Barbershop**: Estabelecimentos cadastrados
- **BarbershopService**: Serviços oferecidos
- **Booking**: Agendamentos realizados

## 🔧 Configuração do Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure as URLs autorizadas:
   - **Origem autorizada**: `http://localhost:3000`
   - **URI de redirecionamento**: `http://localhost:3000/api/auth/callback/google`

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente no painel da Vercel
3. Atualize a `NEXTAUTH_URL` para sua URL de produção
4. Configure as URLs autorizadas no Google OAuth

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Node.js:

- Railway
- Render
- Heroku
- AWS
- Digital Ocean

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Desenvolvedor**: [Seu Nome](https://github.com/seu-usuario)
- **Email**: seu.email@exemplo.com
- **LinkedIn**: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
