const fs = require('fs');
const files = [
  'src/AppRouter.tsx',
  'src/ProtectedRoute.tsx',
  'src/admin/AdminApp.tsx',
  'src/admin/components/DataTable.tsx',
  'src/admin/components/EmptyState.tsx',
  'src/admin/components/FormModal.tsx',
  'src/admin/pages/BlogAdmin.tsx',
  'src/admin/pages/FAQAdmin.tsx',
  'src/admin/pages/Login.tsx',
  'src/admin/pages/OrdersAdmin.tsx',
  'src/admin/pages/PortfolioAdmin.tsx',
  'src/admin/pages/TestimonialAdmin.tsx',
  'src/admin/types.ts',
  'src/pages/AdminDashboard.tsx',
  'src/pages/AdminLogin.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes("import React") && !content.includes("import * as React")) {
      content = "import React from 'react';\n" + content;
      fs.writeFileSync(file, content);
    }
  }
});
