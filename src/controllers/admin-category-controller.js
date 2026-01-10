const { getAllCategories, createCategory, deleteCategory, updateCategory } = require("../services/categoryServices");

// === Render category related pages ===
async function createCategoryPage(req, res) {
    let getCategories = null;
    try {
        getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("create-category", { message: getCategories.error });
            return;
        }
        res.render("create-category", { categoryExist: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        console.log(`Erro: ${error.message}`);
        res.render("create-category", { loadingError: "Erro ao renderizar páginas e dados." });
    }
}

async function deleteCategoryPage(req, res) {
    let getCategories = null;
    try {
        getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("delete-category", { message: getCategories.error });
            return;
        }
        res.render("delete-category", { categoryExist: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        console.log(`Erro: ${error.message}`);
        res.render("delete-category", { loadingError: "Erro ao renderizar páginas e dados." });
    }
}

async function updateCategoryPage(req, res) {
    let getCategories = null;
    try {
        getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("update-category", { message: getCategories.error });
            return;
        }
        res.render("update-category", { categoryExist: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        console.log(`Erro: ${error.message}`);
        res.render("update-category", { loadingError: "Erro ao renderizar páginas e dados." });
    }
}

// === Category CRUD logic ===
async function createNewCategory(req, res) {
    const categoryName = req.body["category-name"];
    let getCategories = null;
    try {
        getCategories = await getAllCategories();

        if (getCategories.valid === false) {
            const createdCategory = await createCategory(categoryName);
            if (createdCategory.valid === false) {
                res.render("create-category", {
                    errorMessage: createdCategory.error,
                    message: getCategories.error
                });
                return;
            }
            res.redirect("/admin/category/create");
            return;
        }

        const categoryExist = getCategories.res.find(c => c.name === categoryName);
        if (categoryExist) {
            res.render("create-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                errorMessage: "Esta categoria já existe."
            });
            return;
        }

        const createdCategory = await createCategory(categoryName);
        if (createdCategory.valid === false) {
            res.render("create-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                errorMessage: createdCategory.error
            });
            return;
        }
        res.redirect("/admin/category/create");
    } catch (error) {
        console.log(`Erro: ${error.message}`);
        res.render("create-category", { loadingError: "Erro ao renderizar páginas e dados." });
    }
}

async function deleteInformedCategory(req, res) {
    const categoryId = Number(req.body["category-id"]);
    let getCategories = null;
    try {
        getCategories = await getAllCategories();
        const informedCategoryExists = getCategories.res.find(c => c.id === categoryId);
        if (!informedCategoryExists) {
            res.render("delete-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                deletionError: "A categoria informada não existe"
            });
            return;
        }

        const deleteInformedCategory = await deleteCategory(categoryId);
        if (deleteInformedCategory.valid === false) {
            res.render("delete-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                deletionError: deleteInformedCategory.error
            });
            return;
        }

        res.redirect("/admin/category/delete");
    } catch (error) {
        console.log(`Erro: ${error.message}`);
        res.render("delete-category", { loadingError: "Erro ao renderizar páginas e dados." });
    }
}

async function updateInformedCategory(req, res) {
    const categoryId = Number(req.body["category-id"]);
    const categoryName = req.body["category-name"];
    
    let getCategories = null;
    try {
        // Não preciso checar se categorias existem.
        getCategories = await getAllCategories();
        const informedIdExists = getCategories.res.find(c => c.id === categoryId);
        if (!informedIdExists) {
            res.render("update-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                updateError: "A categoria informada não existe"
            });
            return;
        }

        const informedNameExists = getCategories.res.find(c => c.name === categoryName);
        if (informedNameExists) {
            res.render("update-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                updateError: "O nome informado já existe"
            });
            return;
        }

        const updateInformedCategory = await updateCategory(categoryId, categoryName);
        if (updateInformedCategory.valid === false) {
            res.render("update-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                updateError: updateInformedCategory.error
            });
            return;
        }

        res.redirect("/admin/category/update");
    } catch (error) {
        console.log(`Erro: ${error.message}`);
       res.render("update-category", { loadingError: "Erro ao renderizar páginas e dados." });
    }
}

module.exports = {
    createCategoryPage,
    createNewCategory,
    deleteCategoryPage,
    deleteInformedCategory,
    updateCategoryPage,
    updateInformedCategory
};